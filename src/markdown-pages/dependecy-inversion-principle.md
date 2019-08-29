---
path: "/blog/dependency-inversion-principle"
date: "2019-08-26"
title: "⚡ Dependency Inversion Principle"
tags: ["SOLID", "Uncle Bob", "Lightning Posts"]
---

This blog entry is the fifth and final in a series of lightning talk style posts about each of the [SOLID Design Principles](https://en.wikipedia.org/wiki/SOLID) for object-oriented software.

The Dependency Inversion Principle (DIP), as it is known, is primarily concerned with decoupling software modules. It states that:

> _Entities must depend on abstractions not on concretions. Concretions should depend on abstractions. High level modules must not depend on the low level modules, they should instead both depend on abstractions (e.g. interfaces)._

As it dictates that both high-level and low-level objects must depend on the same abstraction, this design principle inverts the way some people may think about object-oriented programming, hence the name. 

It sounds a lot more complex than it often is. Adhering to DIP is often a by-product of applying the Open/Closed Principle and the Liskov Substitution Principle to your code. This would generally mean you have interfaces that are implemented by easily interchangeable concretions that are closed to modification and open to extension. 

I really can't say this better than Uncle Bob himself so I'll use his words to drive home the point:

> _Consider the implications of high level modules that depend upon low level modules.
It is the high level modules that contain the important policy decisions and business models of an application. It is these models that contain the identity of the application. Yet,
when these modules depend upon the lower level modules, then changes to the lower level
modules can have direct effects upon them; and can force them to change._

> _This predicament is absurd! It is the high level modules that ought to be forcing the
low level modules to change. It is the high level modules that should take precedence over
the lower level modules. High level modules simply should not depend upon low level
modules in any way_

Let's look at a common code problem and see how we can modify it so that it adheres to the Dependency Inversion Principle. Imagine we have an application that requires some level of data persistence (not a particularly taxing imagination exercise). We might see code that looks like:

```java
public class AccountProvider {
    SQLConnection dbConnection;

    public AccountProvider(SQLConnection sqlConnection) {
        dbConnection = sqlConnection;
    }
}
```

Now, it's likely that, especially with Java or C#, you're going to be using a framework (Spring, ASP.NET, etc) and this is taken care of but humor me. Looking at this example, the `AccountProvidor` is our high level module and it currently relies on the low level module `SQLConnection`. This is a clear violation of DIP. 

If we were to change what database engine we were using we would have to modify both modules. The more 👀 of you may notice we also violate Open/Closed Principle too!

#### A better way

The `AccountProvider` should not care about what database your application uses. To fix this we can create a layer of abstraction, in this case an interface:

```java
public interface DbConnection {
    public DbConnection getConnection();
}
```

```java
public class SQLConnection implements DbConnection {
    public DbConnection getConnection() {
        //return connection 
    }
}
```

```java
public class AccountProvider {
    DbConnection dbConnection;

    public AccountProvider(DbConnection dbConnection) {
        dbConnection = dbConnection;
    }
}
```

Now both of our modules, high level, and low level depend on the same abstraction, the `DbConnection` interface. We can interchange any number of database connections as long as it obeys the API of the interface. Our code is more adaptable, more robust and easier to maintain 🎉!

This post concludes the SOLID Design Principles. I hope these posts have helped you better understand the concepts and the examples illustrated how to implement them to your code. I welcome feedback and discussion and know that I still have a lot to improve upon and learn. 

Thanks for reading!