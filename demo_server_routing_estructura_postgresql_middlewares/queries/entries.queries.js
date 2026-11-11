const queries = {
    getEntriesByEmail: `SELECT * FROM entries 
                        WHERE id_author=(SELECT id_author FROM authors WHERE email=$1)`,
    getAllEntries: `SELECT * FROM entries`,
    createEntry: `INSERT INTO entries(title,content,id_author,category)
                  VALUES ($1,$2,(SELECT id_author FROM authors WHERE email=$3),$4)`,
    updateEntry: `UPDATE entries 
                  SET title=$1, content=$2, date=NOW(), id_author=(SELECT id_author FROM authors WHERE email=$3), category=$4 
                  WHERE title=$5`
}

module.exports = queries;