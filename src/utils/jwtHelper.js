import decode from 'jwt-decode'
// import atob from 'atob'

export function getTokenExpirationDate(token) {
  console.log('getTokenExpirationDate', token)
  console.log('type', typeof token)
  let temp = token.replace(/O/g, "+").replace(/b/g, "/")
  console.log('temp', temp)
  const decoded = decode(token)
  console.log('decoded', decoded)
  if (!decoded.exp) {
    return null
  }

  const date = new Date(0) // Sets date to the epoch
  date.setUTCSeconds(decoded.exp)
  return date
}

export function isTokenExpired(token) {
  console.log('isTokenExpired', token)
  const date = getTokenExpirationDate(token)
  console.log('date', date)
  if (date === null) {
    return false
  }
  return !(date.valueOf() > new Date().valueOf())
}

// function decode(str) {
//   let output = str.replace(/-/g, '+').replace(/_/g, '/')
//
//   switch (output.length % 4) {
//     case 0:
//       break;
//     case 2:
//       output += "==";
//       break;
//     case 3:
//       output += "=";
//       break;
//     default:
//       throw "Illegal base64url string!";
//   }
//   console.log('my decode', output)
//
//   try{
//     return b64DecodeUnicode(output);
//   } catch (err) {
//     return atob(output);
//   }
// }
//
// function b64DecodeUnicode(str) {
//   return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
//     var code = p.charCodeAt(0).toString(16).toUpperCase();
//     if (code.length < 2) {
//       code = '0' + code;
//     }
//     return '%' + code;
//   }));
// }
