function deleteObj(button, currentPage) {
    const buttonID = button.id;
    console.log("Button ID: " + buttonID);
    const buttonIDSplit = buttonID.split(currentPage);
    console.log("Button ID Split: " + buttonIDSplit);
    const ID = buttonIDSplit[1];
    console.log("Deleting Obj with ID: " + ID);

    const fetchString = "/delete-" + currentPage;

    fetch((fetchString), {
        method: 'POST',
        body: JSON.stringify({ deleteID: ID }),
    }).then((_res) => {
        window.location.href = "/" + currentPage;
    });
}

function updateUserObj(button, element) {
    const buttonID = button.id;
    console.log("Button ID: " + buttonID);
    const buttonIDSplit = buttonID.split('.');
    console.log("Button ID Split: " + buttonIDSplit);
    const ID = buttonIDSplit[0];
    console.log("Updating user with ID: " + ID);
    const value = buttonIDSplit[1];
    console.log("Value: " + value);
    console.log("Element: " + element);

    const fetchString = "/update-user";

    fetch((fetchString), {
        method: 'POST',
        body: JSON.stringify({ userId: ID, newValue: value, targetElem: element }),
    }).then((_res) => {
        window.location.href = "/profile";
    });
}