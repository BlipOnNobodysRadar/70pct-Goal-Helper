# 80 Percent Rule

Aiming to accomplish 80 percent of your goals in a day is a great way to make consistent progress. Giving yourself the option to choose which tasks to complete helps on those low energy days.

This simple app makes it easier.

[Short demonstration clip](example.mkv)

List your goals for the day, and click to check one off. The app does the math for you, and you recieve a satisfying visual of your progress.

**Link to project:** https://80percentrule.netlify.app/

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

This app is made to be simple and useful. As a static app, the front end is structured with semantic HTML, styled with CSS, and updated with JavaScript.

JavaScript is used to parse the input string, convert it into list items, and then dynamically render those items as DOM elements. Since these tasks are dynamically rendered and need to be interactable, event listeners are created by using event bubbling on the containing section.

The script tracks state (number of items, how many are marked complete, etc) and calculates the percentage of completed items. The script then updates the DOM by changing which classes are applied to certain elements so that the user gets a visual feedback of their progress. The visuals are colors selected based on percentage thresholds (Grey for 0, brown for beginning, orange for 33%+, yellow 50%+, blue 70%+, and green 80%+).

## Optimizations

Since this an MVP version, many optimizations are planned.

- Use localStorage to track items
- Allow the user to remove items easily
- Use a template for design. (I am not a designer.)

## Lessons Learned:

- Preventing forms from automatically refreshing the page on submit
- Using event bubbling for adding event listeners to dynamically rendered DOM elements
- Be generous with simple, descriptively-named helper functions to form clean and readable code
