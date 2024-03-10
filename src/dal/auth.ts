export const SQL_QUERIES = {
    selectUserByUsername: 'SELECT * FROM eitest.user WHERE username = ?',
    updateUserJwtByUsername: 'UPDATE eitest.user SET jwt = ? WHERE username = ?',
};
