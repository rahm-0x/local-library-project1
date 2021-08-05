function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc,eachAccount) => acc.name.last > eachAccount.name.last ? 1: -1);
}


function getTotalNumberOfBorrows(account, books) {
  let total = 0
  let accountId = account.id
  return books.reduce((acc, book) => {
    return (
      acc +
      book.borrows
        .filter(borrow => borrow.id === accountId)
        .reduce((accumulatorBorrows) => accumulatorBorrows + 1, total)
    );
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  let result = borrowedBooks.map((book) => {
    return { ...book, author: getAuthor(book, authors) };
  });
  return result;
}

// helper function to fetch author object
function getAuthor(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
