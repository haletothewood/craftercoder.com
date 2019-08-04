---
path: "/blog/transformation-priority-premise"
date: "2019-08-04"
title: "TDD with the Transformation Priority Premise"
tags: ["Transformation Priority Premise", "Test Driven Development", "Uncle Bob", "Codurance"]
---
Test-Driven Development is an easy concept that is much harder to do than it seems on the surface. The difficulty lies in it's simplicity. Only through intentional practice, application and experience can we, as developers, come to recognize the steps necessary to do it right.

During my first week on the apprenticeship program at [Codurance](https://codurance.com/careers/become_an_apprentice/) we have been learning the basics of TDD along with a differing set of constraints. These constraints are designed to help us pick up best practice techniques and included, "baby steps", Object Calisthenics, code smells and the subject of this post, the Transformation Priority Premise. 

First, let's begin by taking a look at the [three rules of TDD](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd) as defined by everyone's favorite [Uncle](https://media.itkonekt.com/2019/01/Uncle_Bob_400x400.png):

1.  You are not allowed to write any production code unless it is to make a failing unit test pass.
2.  You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3.  You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

Let's unpack that a little. You must begin by writing a unit test for the functionality that you intend to write. But by rule 2, you can't write very much of that unit test. As soon as the unit test code fails to compile, or fails an assertion, you must stop and write production code. But by rule 3 you can only write the production code that makes the test compile or pass, and no more.

_Now, for some, point 2 is negotiable. A unit test that fails to compile is not really a failing test, it's code that doesn't work. Take it to mean that you should restrict your production code to that which passes the test and does no more. Until you refactor._

With all that in mind move onto the crux of this post which brings into focus the third rule. The idea of the __Transformation Priority Premise__ came from, yes, you guessed it, Uncle Bob, way back in 2010.

The driving purpose behind the premise is to enforce "baby steps" such that the time spent in the refactoring stages of TDD is as minimal as possible. If applied, it acts as a set of ladders with each rung on the ladder a step up in complexity and a step towards more generic code to satisfy a more specific suite of tests.

Here's the transformation list in full:

```
1.  ({} -> nil/null)  
2.  (nil -> constant)  
3.  (constant -> constant+)
4.  (constant -> scalar)
5.  (statement -> statements)
6.  (unconditional -> if) 
7.  (scalar -> array)  
8.  (array -> container)  read: array -> collection
9.  (statement -> recursion)  
10. (if -> while)  
11. (expression -> function)
12. (variable -> assignment)
```

So when making a test pass, you try to do so with transformations that are of a simpler complexity (higher on the list) than those that are more complex.

Not only that but when you are thinking of your next test, you try to add one that allows simpler rather than more complex transformations. This helps to limit the risk, and importantly the time, you take to make that test pass. You do, however, want the tests to drive you towards a more generic solution which often means a step up on the ladder towards complexity. 

So if you choose the tests and implementations that employ transformations that are higher on the list, you will avoid spending too long in the red and your code will develop in small steps towards a generic solution free of unnecessary complexity. 

_It's important to note that the ordering of the transformations are, at best, informal, and are simply designed to make you think before you begin each cycle of red-green-refactor. I've found it to be a useful reference_

For an in-depth look at how to test drive whilst following the TPP I recommend reading through [this excellent post](https://codurance.com/2015/05/18/applying-transformation-priority-premise-to-roman-numerals-kata/) by a colleague at Codurance.