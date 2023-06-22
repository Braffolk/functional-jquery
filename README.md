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
    .fmap($$.this(), $$.remove())
    .fmap($$.getParent(), $$.append());

$(".gameCards .shuffleButton")
    .fon("click")
    .fmap(o => $(o).parent().fmap($doShuffle));
```

### Arrow functions


### PokeValues


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