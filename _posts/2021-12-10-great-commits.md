---
date: 2021-12-10
tags: programming team leadership
category: 
title: "Great commits"
thumbnail: "/assets/dead-branch.png"
layout: post
excerpt_separator: <!--more-->
---

I've always found pleasure in creating CI fluidity when working with teams in software development. Though, I don't always feel that members understand how their integrating code impacts teams work, the progress of the project and the quality of the product, so we had to find ways of communicating around the problem on our team meetings.

<!--more-->

One of the problems that are common with inexperienced teams is the maintenance of long lasting branches with huge code added to the system, sometimes refered to as stale branches. Large stale branches are self limiting entities in our integration process, mostly bringing a code review session to a halt, since it takes so much time going through the changes and connecting the dots that reviewers often postpone due to other things on their table, making the PR hard to commit to. One major reason behind stale branches is commiting to a complex system of changes behind one task instead investing in separation of the task to smaller more managable pieces. This usually happens on forced rules like: "One task, one PR", where authros do not have the power of separation of the task to subproblems.

Sometimes, developers jump into code with high uncertanty of how the problems at hand are solved, and pushing the completion of the task when the code commited solves it, with disregard to the amount of work invested.

Another pitfall of large tasks is the fact that the longer out of sync the code is with original repository, the more chance for it to have conflicts, have unpredicted problems caused by new code and high chance of change of direction. During iterations, it also postpones important feedback that may deprecate the feature if it does not fit well.

I've come to understand some of great working development processes I had over the years with couple of teams, that I would describe via proxy of great commits.

Wouldn't it be nice if there is an implicit way to prevent problems mentioned above?

## Properties of a great commit

Simple well communicated rules are the best rules, because on rules implementation, success is sped up when team members understand and also are quick to actually feel how the rules affects their work positively, especially when they can relate with concequences of work not following those rules.

These rules apply to single commits, though they may also apply to PRs or feature tasks.

A great commit, if not perfect, of a feature development is a commit with following properties:

#### Commits are small (enough)

It is small enough and containing code is clear enough that it is easy to quickly and comfortably review, reason about and figure out if it is considered as a whole independent piece of the bigger puzzle, but not so small that it feels that it is missing more pieces to understand what it is used for. This may not be the whole feature, but a finished layer of a feature, analogue to a subproblem of a bigger problem. This is a minimal limit for a commit. 


#### Commits are complete

The commit is production ready, that is, if i take this commit and add it to production, it will not break functionality or lessen the user experience in any unwanted way. For example, one small commit would be one of the following:
    * A button with its style and events completed, even though it is not yet used in the app.
    * An API controller with a defined endpoint, working with all dependencies that are previously completed.
    * An action event, not necessarily used anywhere yet, that has clearly defined action logic and data that it carries.

#### Commits are limited by upper size

A commit may also be large to complete a feature, but not so large that it takes too long to review and reason about. It should take up to 5 minutes to go through the PR of that commit. This is ofcourse subjective and should be discussed with the team. Some features may be cumbersome and you should find ways to split it up into subfeatures or submodules. Exceptions may occur, though. Exceeding the size of PRs may cause stale branches that are not considered just because of the investment it requires for a careful review.

## Positive consequences

The rules make sense only if, when we implement them, developers start to be more mindful of the important parts of the work they do. For example, splitting the work into atomic pieces allows them to focus all their energy in small elements instead of dissipating the energy across a huge feature that may up the change of careless human errors. 

Also, somehow they inherently implement common design principles like KISS, DRY etc. KISS (keep it simple, stupid) design comes from separation of large tasks into simple chunks. DRY is also easier to deal with when working with smaller chunks, though it takes more work to actually obey the principle.

I noticed that cherry-picking in git now selects a whole thing rather parts of a thing. Your git history becomes a collection of features and subfeatures, with timeline of building blocks one on top of the other.

CI requirements become easier to fullfil, because it is easier to write tests on a small well defined part of code. Complicated and large code changes require so many test cases that it discourages writting good tests with proper case coverage.

## But at what cost?

One major disadvantage that these rules bring to the table is dealing with asynchronous merges after PRs. When splitting a feature into chunks, a developer has to be mindful of the order of PRs that may come one after the other due to dependencies. Sometimes it takes experience to achieve this so inexperienced developers require more guidance from their mentors. Though I would always assume that technical personel reasons about this problem very quickly during the onboarding process.

Second disadvantage may be the ammount of PRs and how it impacts team management. Though, for most experienced reviewers, dealing with small PRs is fine, but when a team is organized around one reviewer and plenty of coders, small PRs bring a lot of context switching for reviewer. What I do in my teams from the start is encouraging reviews from each member, regardless of their seniority, and also make sure there is an approval from one senior and one junior per PR.

Any more disadvantages? Send them to [@covekzbrda](https://www.twitter.com/{{ site.twitter_username }})
