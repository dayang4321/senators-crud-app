export const capitalize = (object) => {
    console.log(object)
   let cappedObject = {}
    for (const key in object) {
        if (key === 'firstName' || key === 'lastName' || key ==='state') {
            console.log(object[key])
            cappedObject[key] = object[key].charAt(0).toUpperCase() + object[key].slice(1)
        }
        else {
            cappedObject[key] = object[key]
        }
    }

    console.log(cappedObject)

    return cappedObject
;
  }