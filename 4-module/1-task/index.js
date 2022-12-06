function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  for (let friend of friends) {
    let liElement = document.createElement('li');
    liElement.innerHTML = friend.firstName + ' ' + friend.lastName;
    ul.append(liElement);
  }
return ul;
}
