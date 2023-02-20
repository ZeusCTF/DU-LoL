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