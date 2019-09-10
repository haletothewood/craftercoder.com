---
path: "/blog/coupling-and-cohesion"
date: "2019-09-10"
title: "Low Coupling and High Cohesion"
tags: ["Design Principles", "Codurance", "Software Engineering"]
---

I have known, for almost as long as I've been coding (two years), that coupling and cohesion are two very important concepts in software design. To be specific, **low coupling and high cohesion** <sup>*</sup>. I've known this, and yet, I don't think I really understood it until my time as an apprentice at [Codurance](https://codurance.com/careers/become_an_apprentice/).

On a superficial level, I knew that code should be DRY and encapsulated into relevant and self-contained components. I also knew that related code should live close together but I think this was limited to just ensuring private methods are close to the method that calls it, or maintaining sensible project folders. 

So this post will be my attempt at explaining what coupling and cohesion are, why they're important properties to think about and how to code in a way that takes them into account. As always I'll provide examples in Java.

#### Coupling

My good friend [Wikipedia](https://en.wikipedia.org/wiki/Coupling_(computer_programming)) states that:

> _In software engineering, coupling is the degree of interdependence between software modules; a measure of how closely connected two routines or modules are; the strength of the relationships between modules._

In simplest terms coupling is about how much your different things know about and depend on the stuff of other things. Your modules (classes) should be as isolated and independent from other modules such that changes in one don't cause cascading changes in others.

If you were to have **high coupling** in your software this would mean that modules know too much about each other and the inner workings of one module impact another (or many). This makes things hard to change and modules become brittle. A change in `Module A`, for example, would likely cause a change to be made in `Module B`, which may even break functionality in `Module C` and vice versa.

A common indicator of coupling is when the Law of Demeter is broken, such that modules are talking to their friend's friend's cousin's auntie once removed. That is to say, one object is reaching through another to modify or query yet another object. This is also associated with a common code smell [Message Chains](https://refactoring.guru/smells/message-chains). 

All of this, in case you were wondering, is bad. Bad for you, bad for your clients, and bad for the future of your software. By making it difficult to change anything in your code you make it harder to adapt to shifting requirements or requests for new features.

By reducing the coupling, or better yet, designing your code from the get-go with coupling in mind, you can easily make changes to modules without fear of breaking code elsewhere. It's important to note however that there is no way to remove coupling altogether, only to limit the impact any changes have. **Low coupling** also makes it easier to write, test and maintain code. This is due to modules exisiting in isolation and without an interdependentness on one another.

Interfaces are a powerful tool in the object-oriented paradigm. They can be used to promote low coupling, in my opinion, and according to the [Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns) are what we should programming to.

Let's look at an example: 

```Java
public class Example {
    private Thing thing;

    public void doAThing() {
        thing = new Thing();
        thing.doSomething();
    }
}

public class Thing {
    public void doSomething() {
        //code
    }
}
```

This class is highly coupled to the `ConcreteThing`. We cannot make changes in the behavior of the `doSomething()` method without it affecting directly this class. You may also recognize that it violates the O in SOLID, the Open/Closed Principle. It is not open to extension or closed to modification. We can solve both issues by using an interface.

Like so:

```java
public class Example {
    private Thing thing;

    public Example(Thing thing) {
        this.thing = thing;
    }

    public void doAThing() {
        thing.doSomething();
    }
}

public interface Thing {
    public void doSomething();
}

public class ConcreteThing implements Thing {
    public void doSomething() {
        //code
    }
}
```

Now, if I need to change the expected behaviour I can simply create another concrete implementation. The code is now loosley coupled, easier to test and simple to extend.

#### Cohesion

Let's look at the [Wikipedia](https://en.wikipedia.org/wiki/Cohesion_(computer_science)) definition once more:

> _In computer programming, cohesion refers to the degree to which the elements inside a module belong together. In one sense, it is a measure of the strength of relationship between the methods and data of a class and some unifying purpose or concept served by that class. In another sense, it is a measure of the strength of relationship between the class's methods and data themselves._

Again, thinking in the most simple form, cohesion is about how much all the stuff in a thing belongs together. Stuff meaning classes, modules, packages, etc., and a thing meaning an attribute, a method, etc. 

If your code suffered from low cohesion it would mean that your functionality is spread out over your system or is not organized in a way that makes sense. Maybe there is duplication of knowledge, shared functionality between modules, or arbitray grouping of functionality within modules. All this leads to a very confusing codebase that is hard to maintain, difficult to test and nigh on impossible to make changes to. Each change requires careful consideration across multiple modules and changes don't seem to be made in logical places.

Take this example:

```Java
public class Example {
    private Thing a;
    private AnotherThing b;
    private YetAnotherThing c;

 //code

    public void doAThing() {
        a.doSomething();
    }

    public void doAnotherThing() {
        b.doSomething();
    }

    public void doYetAnotherThing() {
        c.doSomething();
    }
}
```

Here we have what is called `coincidental cohesion`. The only connection between the parts of this module is that they are part of this module. An example could be like a helper class, or Utility where elements are completely independent of each other.

This is clearly the lowest of low cohesion and is a very simple example. However, it's not out of the ordinary to see varying degrees of this in the wild. What do you think is the better alternative to this? For me, each of these fields probably belong in their own module. 

To borrow from [The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Andrew-Hunt/dp/020161622X/ref=sr_1_1?adgrpid=52230164094&gclid=EAIaIQobChMIw5TRxrTG5AIVDLDtCh1rIQHtEAAYASAAEgJFHPD_BwE&hvadid=259088862423&hvdev=c&hvlocphy=9045999&hvnetw=g&hvpos=1t1&hvqmt=e&hvrand=6164697362152308605&hvtargid=kwd-302199567278&hydadcr=17611_1817757&keywords=the+pragmatic+programmer&qid=1568123848&s=gateway&sr=8-1):

> _We want to design components that are self-contained: independent, and with a single, well-defined purpose_

A highly cohesive module will have elements that are directly related to the single functionality that module is providing. This way our code stays DRY, is easier to maintain and can be tested in isolation (the I of [FIRST](http://agileinaflash.blogspot.com/2009/02/first.html)).

#### In Summary

Suffice it to say these two properties are hugely important and are vital to understand when designing good software. The two often work hand in hand. A codebase that is highly cohesive is also likely to be low in coupling and vice versa. Not always but one is a good sign the other may be present. Writing code that is both means that it will be maintainable which is an invaluable quality for programmers and clients alike. 

It makes it easier to design and implement new features and write code. It means we can add value quicker and more easily. Debugging becomes a joy and not a chore (ok, I may be pushing it with that one) and the risk of adopting change is dramatically reduced.

Thanks for reading! As always I welcome comments or challenges to my interpretation of the topic.

<sup>* _sometimes referred to as loose coupling and tight coupling_ </sup>