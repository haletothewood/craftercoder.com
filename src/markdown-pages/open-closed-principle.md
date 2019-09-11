---
path: "/blog/open-closed-principle"
date: "2019-08-18"
title: "Open/Closed Principle"
tags: ["SOLID", "Uncle Bob", "Design Principles", "Software Engineering"]
---

This blog entry is the second in a series of lightning talk style posts about each of the [SOLID Design Principles](https://en.wikipedia.org/wiki/SOLID) for object-oriented software.

The Open/Closed Principle was first defined by Robert C. Martin, and was built on top of the work done by [Bertrand Meyer](https://en.wikipedia.org/wiki/Bertrand_Meyer) in 1988. So it's been around for a while, but unlike many 80s trends (I'm looking at you [Tamagochi](https://en.wikipedia.org/wiki/Tamagotchi)), it remains as relevent today as it was then.

Meyer states that:
> _"Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification"_

And Uncle Bob later expressed this as:
> _You should be able to extend the behavior of a system without having to modify that system._

Let's suppose you have written code in one place within your application and that code is now used elsewhere. You want to be able to adapt this to different purposes by writing additional code and not by modifying the code itself. This is because modifying it will likely cause changes to be made everywhere it is used.

You may notice that this is similar to the Single Responsibility Principle in that it is primarily concerned with reducing the impact of future change.

#### An example: Calculating Area

```java
public class Rectangle
{
    //code
    public double getWidth() {
        return this.width;
    }

    public double getHeight() {
        return this.height;
    }
}
```

Imagine you know need to calculate the combined area of a collection of rectangles. You may end up with code not too disimilar to:

```java
public class AreaCalculator
{
    public double area(List<Rectangle> shapes)
    {
        double area = 0;
        for (Rectangle shape : shapes) {
            area += shape.getWidth() * shape.getHeight();
        }

        return area;
    }
}
```

If we want to add functionality to the area calculator such that it also calculates the area of a circle. We may do something like:

```java
public double area(Object[] shapes)
{
    double area = 0;
    for (Object shape : shapes) {
        if (shape instanceOf Rectangle) {
            Rectangle rectangle = (Rectangle) shape;
            area += rectangle.getWidth() * rectangle.getHeight();
        }

        if (shape instanceOf Circle) {
            Circle circle = (Circle) shape;
            int radius = circle.getRadius()
            area += radius * radius * Math.PI;
        }
    }

    return area;
}
```
Take a minute and understand why this code does not adhere to the Open/Closed Principle...

Of course in this very basic scenario it isn’t particularly complicated to add more code, say for calculating the area of a triangle but it would require us to modify the code. Meaning that AreaCalculator isn’t **closed for modification** as we need to change it in order to extend it. In other words: it isn’t **open for extension**.

#### Abstract classes for the win!

One common way of resolving this kind problem is to create a base class for both `Rectangle` and `Circle` and all other subsequent shapes that could be in the future. This class will define an abstract method for calculating the area.

```java
public abstract class Shape
{
    public abstract double area();
}
```

Now each shape will extend the base class and implement their own method for the area.


```java
public class Rectangle extends Shape
{
    //code
    @override
    public double area()
    {
        return this.width * this.height;
    }
}

public class Circle extends Shape
{
    //code
    @override
    public double area()
    {
        return this.radius * this.radius * Math.PI;
    }
}
```

Looking at the area method now it's much simpler and more robust as it can now handle any type of `Shape` that it'a given now and in the future without needing to be modified.

```java
public double area(Shape[] shapes)
{
    double area = 0;
    for (Shape shape : shapes) {
        area += shape.area();
    }

    return area;
}
```

It is **open to extension** in that it can accept collections of an ever increasing array of `Shape`'s but it is **closed for modification** as it does what we need it to do now and in the future.

Now this is a very simplistic example and this prinicple was more defined within a module or package scope. For an excellent take on how OCP applies on a higher level I recommend reading [this post](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html) from Uncle Bob.

Next up from me is the Liskov Substitution Principle.




