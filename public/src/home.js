function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let total = 0
  for(let i = 0; i < books.length; i++){
    let borrowed = books[i].borrows
    for(let y = 0; y < borrowed.length; y++){
      if(borrowed[y].returned === false) {
        total++
      }
    }
  }
  return total
}

function _sortObjByValues(obj){
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA] > obj[keyB]){
      return -1;
    } else if (obj[keyB]>obj[keyA]){
      return 1;
    } else {
      return 0;
    }
  })
}

function getMostCommonGenres(books) {
  const count = books.reduce((acc, {genre}) =>{
    if(acc[genre]){
      acc[genre] += 1
    } else{
      acc[genre] = 1
    }
    return acc
  }, {});

  const sortCount = _sortObjByValues(count)
  return sortCount.map((name) => ({name, count: count[name]})).slice(0,5)
}

function getMostPopularBooks(books) {
  let count = 5;
  const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
  borrows.sort((acc,eachBook) => eachBook.count - acc.count);
  return borrows.slice(0,count);
}


function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});
  for (let id in count) {
    const sum = count[id].reduce((acc, book) => acc + book);
    count[id] = sum;
  }
  const sorted = _sortObjByValues(count);
  return sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      const name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
