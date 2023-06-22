# Functional jQuery

This is an experimental library that attemps to modernise jQuery by introducting more functional programming concepts to jQuery.

README is a work in progress.

## Concepts
Functional jQuery attempts to simplify and modernise jQuery by introducing lazy queries, clean support for arrow functions, method shortcuts and the ability to map values along DOM elements.

### Lazy queries
Lazy queries are a way to defer execution of a jQuery query. This allows you to build up a query and execute it later. This is useful for example when you want to reuse a query multiple times, or when you want to execute a query after an event has happened.

```javascript
const $doShuffle = $$.lazy()
    .fsort(true, $$.random())
    .fmap($$.removeThis(), $$.getParent(), $$.appendThis());

$(".gameCards .shuffleButton")
    .fon("click")
    .fmap(o => $(o).parent().fmap($doShuffle));
```

### Arrow functions


### PokeValues


### Function naming conventions
Since each query function allows modification of either the Iterable or updating This (DOM element), it is important to know which one is being modified. To resolve this, the naming of functions follows two main rules.


Methods starting with get are used to get values from This and sets them as iterable.
```
$$.getText() - gets text from this, sets it to iterable
$$.getAttr("data-id") - gets data-id attribute from this
```

Methods starting with set are used to set values to This, from iterable.
```
$$.setText() - sets text of this to current iterable
$$.setAttr("data-id") - sets data-id attribute of this to current iterable
```

Methods that could modify either This or iterable, are named after the target (It or This).
```
$$.appendIt() - appends iterable to this
$$.appendItTo(selector) - appends iterable to selector
$$.appendThis() - appends this to iterable
$$.appendThisTo(selector) - appends this to selector
$$.reattachThis() - reattaches this to iterable
$$.reattachThisTo(selector) - reattaches this to selector
$$.removeThis() - removes this from DOM
$$.removeIt() - removes iterable from DOM
```

So, to uppercase the text of an element and move it to #list, you would do:
```javascript
$("selector").fmap(
    $$.getText(),
    $$.str.toUpperCase(),
    $$.setText(),
    $$.reattachThisTo("#list")
)
````






### Functions overview

Functions:

| Function | Description                                                                                                                                                                                                                                                                   |
| --- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `lazy` | Returns a lazy query, which is executed in the future                                                                                                                                                                                                                         |
| `fmap` | Maps a function over a jQuery object. This method accepts arrow functions, where the first parameter is the DOM element and second is a special value, which is carried between functions. For example calling fmap($$.getText()) carries on the text of each matched element |
| `fon` | Adds an event listener to a jQuery object. Any followup methods run in a LazyQuery, when the event triggers                                                                                                                                                                   |




## Examples
Example table sorting. Both examples are short, hence uglier than standard, to show readability at short length.


Standard jQuery:
```javascript
const addCellEvents = () => {
    $("#table td").on("mouseenter", function () {
        $("#selection").text($(this).text());
        $(this).css("background-color", "yellow");
    });
    $("#table td").on("mouseleave", function () {
        $(this).css("background-color", "white");
    });
};
$("#table th").on("click", function () {
    const order = $(this).data("order");
    $(this).data("order", !order);
    const index = $(this).index();
    const $rows = $(`#table tr td:nth-child(${index + 1})`);
    $rows.sort((a, b) => {
        const aText = $(a).text();
        const bText = $(b).text();
        if (order) {
            return aText.localeCompare(bText);
        } else {
            return bText.localeCompare(aText);
        }
    });
    $rows.parent().remove();
    $rows.map((i, o) => {
        return $(o).parent().appendTo("#table")
    });
    $("#table th .symbol").text(" ");
    $(this).find(".symbol").text(order ? " v" : " ^");

    addCellEvents();
});
addCellEvents();
```

Functional jQuery:
```javascript
const doCellEvents = $$.lazy()
    .fon("mouseenter")
    .css("background-color", "yellow")
    .fmap((o) => $("#selection").text($(o).text()))
    .fon("mouseleave")
    .css("background-color", "white");

$("#table td").fmap(doCellEvents);

const order = $$.pokeValue(false, o => !o);
const doAddOrderArrow = $$.lazy()
    .fmap($$.lazy("#table th .symbol").text(" "))
    .find(".symbol").text(() => order.get() ? " v" : " ^");

$("#table th")
    .fon("click")
    .fmap(
        o => $(`#table tr td:nth-child(${$(o).index() + 1})`)
            .fsort(order(), $$.getText())
            .fmap($$.getParent(), $$.reattach("#table")),
        $$.lazy("#table td").fmap(doCellEvents)
    )
    .fmap(doAddOrderArrow);
```