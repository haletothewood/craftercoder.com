---
path: "/blog/liskov-substitution-principle"
date: "2019-08-20"
title: "⚡ Liskov Substitution Principle ⚡"
tags: ["SOLID", "Uncle Bob", "Lightning Posts"]
---

This blog entry is the third in a series of lightning talk style posts about each of the [SOLID Design Principles](https://en.wikipedia.org/wiki/SOLID) for object-oriented software.

First introduced by [Barbara Liskov](https://en.wikipedia.org/wiki/Barbara_Liskov), in a 1987 conference keynote address titled Data abstraction and hierarchy, the Liskov substitution principle (LSP) is a particular definition of a subtyping relation, called (strong) behavioral subtyping.

It can be stated as such:

> _If S is a subtype of T, then objects of type T in a program may be replaced with objects of type S without altering any of the desirable properties of that program_

Or in duck terms:

> _If it looks like a_ 🦆_, quacks like a_ 🦆 _but needs batteries - you probably have the wrong level of abstraction_

Let's look at an example, in code, of a violation of the Liskov Principle amd potential fix. Say we have an application that was built to automate the refueling of petrol cars. This was later extended to also cater for recharging electric cars. The developer decided to use the Open/Closed Principle (OCP - check out my previous post if you haven't already) to "close" the code to the addition of new types of cars. To do this, the following abstract Car base class was created:

```java
public abstract class Car {
    //other methods

    public abstract void fillUpWithFuel();

    public abstract void chargeBattery();
}
```

And we have our two subclasses that extend `Car`:

```java
public class PetrolCar extends Car {
    //code
    @Override
    public void fillUpWithFuel() { 
        this.fuelTankLevel = FUEL_TANK_FULL; 
    }

    @Override
    public void chargeBattery() {
        throw new UnsupportedOperationException("A petrol car cannot be recharged");
    }
    //code
}
```

And:

```java
public class ElectricCar extends Car {
    //code
    @Override
    public void fillUpWithFuel() {
        throw new UnsupportedOperationException("It's an electric car");
    }

    @Override
    public void chargeBattery() {
        this.batteryLevel = BATTERY_FULL;
    }
    //code
}
```

It's fairly common to see code like this and while, yes, it does obey the aforementioned OCP, it quite clearly also violates LSP. Take a minute to see if you can articulate why?

By not properly supporting all of the parent class methods and instead throwing exceptions both the `PetrolCar` and `ElectricCar` fail to meet the requirements set out by Liskov.

So let's fix that. One solution for this problem could be to extract out the refueling and charging to two separate interfaces. This abstraction would mean that any subtype of `Car` would only have to implement the methods common amongst all cars. `PetrolCar` would then implement the `Refuelable` interface and `ElectricCar` the `Rechargeable` interface. 

An alternative approach could be to do the following. 

```java
public abstract class Car {
    //other methods
    public abstract void fill();
}
```

Such that each car would implement their own concretion of how they 'fill up'.

```java
public class ElectricCar extends Car {
    //code
    @Override
    public void fill() {
        this.batteryLevel = BATTERY_FULL;
    }
    //code
}
```

And:

```java
public class PetrolCar extends Car {
    //code
    @Override
    public void fill() { 
        this.fuelTankLevel = FUEL_TANK_FULL; 
    }
    //code
}
```
In both solutions we refactored the code such that Liskov's Principle is adhered to. We could now, should we wish substitute the abstract base class `Car` with either of the subclasses.

I'm not sure which I prefer but the one shown in code is how I solved the problem during a refactoring kata that can be found [here](https://github.com/ivanbadia/solid-kata/).

There is more to discuss here, specifically the pre and post conditions, as well as the method signatures (which in this case is void). I will endevour to circle back at some point and dive into this a little deeper. This, after all is a ⚡ post!

Next up is the Interface Segregation Princicple.



