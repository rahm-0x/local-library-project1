function findAuthorById(authors, id) {
  return authors.find(auth => auth.id === id);
}

function findBookById(books, id) {
  return books.find(bookie => bookie.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce( (acc, eachBook) => { acc[+(eachBook.borrows[0] && eachBook.borrows[0].returned)].push(eachBook); return acc }, [[],[]] )
  

}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;  
  borrowArray.forEach(borrow=>{
    let account = accounts.find(acc => acc.id === borrow.id);
    let obj = account;
    obj['returned'] =  borrow.returned;
    result.push(obj);
  })
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
