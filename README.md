# Functional jQuery

This is an experimental library that attemps to modernise jQuery by introducting more functional programming concepts to jQuery.

README is a work in progress.

## Concepts
- LazyQuery
- Mapped values
- PokeValues

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

