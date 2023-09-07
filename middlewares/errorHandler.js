const errorHandler = (err, req, res, next) => {
    console.log(err);
  
    switch (err.name) {
        case "FailedCreate":
            res.status(400).json({ message: "Failed create!" });
            break;
        case "FailedUpdate":
            res.status(400).json({ message: "Failed update!" });
            break;
        case "FailedDelete":
            res.status(400).json({ message: "Failed delete!" });
            break;
        case "IncompleteData":
            res.status(400).json({ message: "Incomplete data!" });
            break;
        case "ErrorNotFound":
            res.status(404).json({ message: "Data not found!" });
            break
        default:
            res.status(500).json({ message: "Internal server error!" });
            break;

    }
}

module.exports = errorHandler