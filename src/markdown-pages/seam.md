---
path: "/blog/seam"
date: "2019-09-02"
title: "Using a seam to test legacy code"
tags: ["TDD", "Codurance", "Legacy Code"]
---

This post is about working with legacy code and specifically creating a seam as a technique to more easily test that code. I encountered the technique during the refactoring week of the [Codurance Apprenticeship program](https://codurance.com/careers/become_an_apprentice/).

So what is legacy code? Ask 100 programmers and it's quite probable that you'll get 100 different answers but most will be a combination of the following things:

* Code that isn't tested
* Code that's inherited from another team
* Code that's out dated
* Code that's just been written!

I have to admit I quite like that last one. For me, if code can be refactored using common design patterns and best practice then it's legacy code. Code that wasn't written with testing in mind, or test driven it can be incredibly difficult to get under test. This is especially difficult when classes are rife with tightly coupled dependecies.

Let's look at an example in Java. This code is from an excellent kata by Sandro Mancuso called [The Trip Service](https://github.com/sandromancuso/trip-service-kata) (Have a go first if you like, then return here if you're stuck).

```java
public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {
		List<Trip> tripList = new ArrayList<Trip>();
		User loggedUser = UserSession.getInstance().getLoggedUser();
		boolean isFriend = false;
		if (loggedUser != null) {
			for (User friend : user.getFriends()) {
				if (friend.equals(loggedUser)) {
					isFriend = true;
					break;
				}
			}
			if (isFriend) {
				tripList = TripDAO.findTripsByUser(user);
			}
			return tripList;
		} else {
			throw new UserNotLoggedInException();
		}
	}
```

This code is what Micheal Feathers might call "a sheet of text"; more of him later. It's not immediately clear what's going on here and so it would be good to start adding tests. It's recommended, when applying a suite of tests, to first test the deepest branch of the code. In this case that would be the `else` branch that throws a `UserNotLoggedInException` if the user is not a logged in user. Let's imagine we have written that test:

```java
@Test
    void throw_exception_when_user_not_logged_in() {
        loggedInUser = GUEST; //null
        assertThrows(UserNotLoggedInException.class, () -> tripService.getTripsByUser(loggedInUser));
    }
```

What do you think will happen here? Well it's likely to work fine if `UserSession` returns `null` when there is no logged in user. A fair assumption based on the code...maybe. If not, or as soon as we start testing the branch of code that deals with a logged in user, we are going to run in to trouble. Can you see why?

As the `UserSession` dependency is hard-wired (meaning we are newing up an instance in this method) we cannot change the behaviour of this under test. We can't mock or stub it in any way, so that we can return a logged in user and test that branch of logic. We need a seam.

In his book [Working effectively with Legacy Code](https://www.amazon.co.uk/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052/ref=sr_1_1?qid=1567371806&refinements=p_27%3AMichael+Feathers&s=books&sr=1-1&text=Michael+Feathers) Micheal Feathers defines a seam as:

> _A place where you can alter behavior in your program without editing in that place._

Sounds like quite a simple concept doesn't it. How can we do this with our code example? Well, a nice and simple way is to extract that logic to a method that we can then ovveride with an abstract class just for testing. Now I know this may seem like quite an indirect way to improve this code. You may say, why not just refactor the code directly and inject the dependency instead.

Sometimes that works, but in particularly gnarly code, often the best approach is to do what you can to modify the code as little as possible when you are getting tests in place. If you know the seams offered by the language and how to use them, you can more often get tests in place quicker and safer than you could otherwise.

Let's add a seam to our code:

```java
public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {
        List<Trip> tripList = new ArrayList<Trip>();
        User loggedUser = getLoggedUser();
        boolean isFriend = false;
        if (loggedUser != null) {
            for (User friend : user.getFriends()) {
                if (friend.equals(loggedUser)) {
                    isFriend = true;
                    break;
                }
            }
            if (isFriend) {
                tripList = TripDAO.findTripsByUser(user);
            }
            return tripList;
        } else {
            throw new UserNotLoggedInException();
        }
    }

    protected User getLoggedUser() {
        return UserSession.getInstance().getLoggedUser();
    }
```

And now we can create a class that overrides the `getLoggedUser()` method, like so:

```java
private class TestableTripService extends TripService {
        @Override
        protected User getLoggedUser() {
            return loggedInUser;
        }
    }
```

And now we have some control over setting the conditions of our test and we can continue adding tests to cover all the branches of logic. That is until we hit a simlar problem with the `TripDAO`. Good thing is we now know what we need to do!

Seams to the rescue!

_* I highly recommend attempting the kata mentioned in this post. It's an excellent introdction to testing and refactoring hard-wired dependencies. Once you've had a go watch Sandro's walkthrough_ [here](https://www.youtube.com/watch?v=_NnElPO5BU0).