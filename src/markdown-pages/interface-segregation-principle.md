---
path: "/blog/interface-segregation-principle"
date: "2019-08-22"
title: "Interface Segregation Principle"
tags: ["SOLID", "Uncle Bob", "Design Principles", "Software Engineering"]
---

This blog entry is the fourth in a series of lightning talk style posts about each of the [SOLID Design Principles](https://en.wikipedia.org/wiki/SOLID) for object-oriented software.

Robert C. Martin (Uncle Bob) defined the interface-segregation principle (ISP) whilst working with Xerox to improve the software for their new printers. He stated it as:

> _A client should never be forced to implement an interface that it doesn't use. Nor should clients be forced to depend on methods they do not use._

The motivation behind this principle is to move towards a codebase that relies on thin abstract interfaces. It makes it easier for clients to have less dependent factors between modules them, thus reducing coupling, increasing cohesion and improving the maintainabilty of the code. 

This is in a similar vain to the Single Responsibility Principle. Your abstractions should be small, individual units of business logic so that your clients implement the slice of the pie they need not the whole pie (nor the ice cream, cherry or sprinkles).

Let's take a look at an example, in Java. Suppose we have an interface for a shape that has a public method for calculating it's area:

```java
public interface Shape {
    public int area();
}
```

So any shape that implements this interface must have a concretion of the area method, like so:

```java
public class Square implements Shape {
    //code
    public int area() {
        this.width * this.height;
    }
}
```

Now if we add a specification that requires 3D shapes, like a cube for example, we may think to add a volume method to our interface:

```java
public interface Shape {
    public int area();
    public int volume();
}
```

Makes sense right?. We're still dealing with a shape, this behaviour belongs in the `Shape` interface. Hmm, not quite. Any shape we create (or have created) must now implement the volume method, but we know that squares are flat shapes and that they do not have volumes. This interface would force the Square class to implement a method that it has no use of. 

A better way is to create another interface with a smaller slice of the pie, in this case the volume method:

```java
public interface Solid {
    public int volume();
}
```

Now our new cube class could look like this:

```java
class Cube implements Shape, Solid {
    // code
    public int area() {
        // calculate surface area
    }

    public int volume() {
        // calculate volume
    }
}
```

Much better right? Yes, but what if we had another class that relied on these abstractions, say a class that calculates the combined space of a collection of shapes would take up. How do we keep the abstraction of that class being able to accept any type of shape?

Well we could create yet another interface that provides a public API to calculate a shape's total space. We could even change the name of the current `Shape` to `Flat` to better describe why it has an `area()` method and `Shape` could now be the interface that this implements the space calculation this class depends on. 

That would leave us with the following code:

```java
public interface Shape {
    public int calculateSpace();
}
```
```java
public interface Flat {
    public int area();
}
```
```java
public interface Solid {
    public int volume();
}
```

And `Cube` and `Square` now look like:

```java
public class Square implements Shape, Flat {
    // code
    public int calulateSpace() {
        return area();
    }

    public int area() {
        // calculate area
    }
}
```
```java
public class Cube implements Shape, Flat, Solid {
   // code
    public int calulateSpace() {
        return area() + volume();
    }

    public int area() {
        // calculate surface area
    }
    
    public int volume() {
        // calculate volume
    }
}
```

And our calculate space method could look like this:

```java
public int calculateTotalSpace(List<Shape> shapes) {
    for (Shape shape : shapes) {
        shape.calculateSpace();
    }
}
```

So we have nice, clean public API for a shape and small abstractions for the individual behaviour that shapes of different types could have. Each type of shape will only need to implement the interface/s it needs and no more. We have adhered to the Integration Segregation Principle 🎉!

Next up is the final principle in SOLID, the Dependency Inversion Principle.