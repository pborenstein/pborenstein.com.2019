// figure out rotation from exif

module.exports = function rotate(exif) {
  if ('Orientation' in exif) {
    if (exif.Orientation.startsWith("Horizontal"))
      return ""
    else
      return "rotate90"
  }
  return ""
}
