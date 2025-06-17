export default function numberToReal(value: any) {
  var numero = value.toFixed(2).split('.');
  numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
  
  return numero.join(',');
}