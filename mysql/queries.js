const queries = {
  createUser: (name, email, password) => {
    return `INSERT IGNORE users 
                (name, email, password)
                     VALUES
                        ("${name}", "${email}", "${password}");`;
  },

  deleteUser: (user_id) => {
    return `DELETE 
              FROM users 
                  WHERE id = "${user_id}";`;
  },

  checkCreds: (email, password) => {
    return `SELECT id
                FROM users
                    WHERE 
                        email = "${email}"
                            AND 
                                password = "${password}";`;
  },

  addToken: (user_id, token) => {
    return `INSERT INTO logins
                    (user_id, token)
                            VALUES
                                (${user_id}, "${token}");`;
  },

  removeToken: (token) => {
    return `DELETE FROM logins
                WHERE token = "${token}";`;
  },

  getUser: (token) => {
    return `SELECT name, email, users.id, users.entry_date FROM users
              JOIN logins
                ON users.id = logins.user_id
                  WHERE token = "${token}";`;
  },

  updateUser: (user_id, name, email, password) => {
    return `UPDATE users
      SET name = "${name}", email = "${email}", password = "${password}" 
        WHERE id = "${user_id}";`;
  },
};

module.exports = queries;
