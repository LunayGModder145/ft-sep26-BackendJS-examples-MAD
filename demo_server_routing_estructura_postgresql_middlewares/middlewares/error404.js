const error404 = (req, res, next) => {
    res.status(404).json({
      success: false,
      message: "404 not found",
      image:"https://http.cat/images/404.jpg"
    });
  }

module.exports = error404;