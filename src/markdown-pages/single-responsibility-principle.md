---
path: "/blog/single-responsibility-principle"
date: "2019-08-17"
title: "⚡ Single Responsibility Principle"
tags: ["SOLID", "Uncle Bob", "Lightning Posts"]
---

This blog entry will be the first in a series of lightning posts about each of the [SOLID Design Principles](https://en.wikipedia.org/wiki/SOLID) for object-oriented software. First identified by Robert C. Martin (Uncle Bob) in a 2000 paper, these designs, if applied, produce a more maintainable, adaptable and understandable codebase.

The principles in full are as follows:

* Single Responsibility Principle
* Open/Closed Principle
* Liskov Substitution Principle
* Interface Segregation Principle
* Dependency Inversion Principle

Now, you can find a tonne of definitions and summaries for each of these principles, including, of course, in Uncle Bob's [original paper](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf). I will attempt to add my understanding to the plethora of others in a hopefully, succinct and digestible way, using practical examples in Java.

#### Single Responsibility Principle

This principle states that each class should have one, and only one reason to change. The responsibility of the class should be scoped to a specific functionality and encapsulated within a single class or module. Primarily it's concerned with limiting the impact of future change.

It's fairly easy to spot when a class is violating single responsibility. Let's look at a simple example:

```java
public class ReportPrinter {

    public void print(String content) {
        String formattedContent = format(content);

        printheader();
        printContent(formattedContent);
        printFooter();
    }

    private String format(String content) {
        //format the string
    }

    //code
}
```
What's clear here is that this class can be changed for two reasons. First, the content of the report could change. Second, the format of the report could change. These two things change for very different reasons. These two aspects of the problem (printing the content) are really two separate responsibilities. They should, therefore, be in separate classes. This would resolve the coupling of these two separate concerns.

So let's do that:

```java
public class ReportPrinter {
    private ReportFormatter formatter;

    public ReportPrinter(ReportFormatter formatter) {
        this.formatter = formatter;
    }

    public void print(String content) {
        String formattedContent = formatter.format(content)

        printHeader();
        printContent(formattedContent);
        printFooter();
    }

    //code
}
```

Should we need to change the formatting in the future we no longer need to touch this class. We have separated the responsibility and made the code easier to maintain. The formatting logic is precisely where it should be...in the `ReportFormatter`.

Next up will be the Open/Closed Principle.