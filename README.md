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

The script tracks state (number of items, how many are marked complete, etc) and calculated the percentage of completed items. Using this information, the script updates which classes are applied to certain elements so the user gets a visual feedback of their progress. The visuals are colors selected based on percentage thresholds (Grey for 0, brown for beginning, orange for 33%+, yellow 50%+, blue 70%+, and green 80%+)

## Optimizations

_(optional)_

You don't have to include this section but interviewers _love_ that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are **GREAT** to bring up in interviews and you can use this section as reference when studying for technical interviews!

## Lessons Learned:

No matter what your experience level, being an engineer means continuously learning. Every time you build something you always have those _whoa this is awesome_ or _fuck yeah I did it!_ moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing.

## Examples:

Take a look at these couple examples that I have in my own portfolio:

**Palettable:** https://github.com/alecortega/palettable

**Twitter Battle:** https://github.com/alecortega/twitter-battle

**Patch Panel:** https://github.com/alecortega/patch-panel
