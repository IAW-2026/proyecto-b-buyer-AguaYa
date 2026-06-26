import type { Vendor } from '../lib/external_api_calls/vendors'
import type { Product } from '../lib/external_api_calls/products'

export const seedVendors: Vendor[] = [
  { id: "cmpc2bcv70000ywli7e5bwtjb", name: "Agua Pura SA", description: "Agua Pura SA", address: "", productCount: 2 },
  { id: "cmpc2bcwz0001ywliokr46gxw", name: "Bidones del Sur", description: "Bidones del Sur", address: "", productCount: 1 },
  { id: "cmpc2gjz90000ikli1cg4gmsj", name: "Pimpollo Acuatico", description: "Pimpollo Acuatico", address: "", productCount: 8 },
  { id: "cmpvxr5er000004l51nrtqen5", name: "Test Vendedor 1", description: "Test Vendedor 1", address: "", productCount: 2 },
  { id: "cmpvzaa70000004jx0pr8akam", name: "aguaskaYA", description: "aguaskaYA", address: "", productCount: 1 },
  { id: "cmpkbt5iv000004ibi3g3w7kd", name: "agustin", description: "agustin", address: "", productCount: 1 },
  { id: "cmpt0mhyx000104jmkvcy7p64", name: "Andycode", description: "Andycode", address: "", productCount: 1 },
  { id: "cmpvzfw5c000004jscdsssg2x", name: "Industrias Alamo biag nig", description: "Industrias Alamo biag nig", address: "", productCount: 4 },
  { id: "cmpt0o95i000204jmt7zsv5if", name: "dsadas", description: "dsadas", address: "", productCount: 2 },
  { id: "cmpe85dqj000005jfsswj7qgy", name: "el agua del papu", description: "el agua del papu", address: "", productCount: 1 },
]

export const seedProducts: Product[] = [
  // Agua Pura SA
  { id: "cmpc2bczn0003ywlixv56emiz", vendorId: "cmpc2bcv70000ywli7e5bwtjb", name: "Bidón 12 litros", description: "", price: 1800, stock: 30 },
  { id: "cmpc2bcyd0002ywli37eu4uip", vendorId: "cmpc2bcv70000ywli7e5bwtjb", name: "Bidón 20 litros", description: "", price: 2500, stock: 50 },

  // Bidones del Sur
  { id: "cmpc2bd1b0004ywlimkue052h", vendorId: "cmpc2bcwz0001ywliokr46gxw", name: "Bidón 20 litros Premium", description: "", price: 3200, stock: 19 },

  // Pimpollo Acuatico
  { id: "cmpfv5pkm000004ji07hi6gky", vendorId: "cmpc2gjz90000ikli1cg4gmsj", name: "Agua 2", description: "", price: 10000, stock: 5 },
  { id: "cmpc2lgbk0002ikliyzwtlixv", vendorId: "cmpc2gjz90000ikli1cg4gmsj", name: "Agua Refrescante", description: "", price: 1000, stock: 9958 },
  { id: "cmpdhu3090000csli86gyf23f", vendorId: "cmpc2gjz90000ikli1cg4gmsj", name: "Agua Salada", description: "", price: 3000, stock: 32 },
  { id: "cmpvvmoo00006sslihbpj0s0m", vendorId: "cmpc2gjz90000ikli1cg4gmsj", name: "Nenopex", description: "", price: 3123, stock: 14 },
  { id: "cmqtv4vk4000005jvgqv7zgrk", vendorId: "cmpc2gjz90000ikli1cg4gmsj", name: "Producto test12", description: "", price: 123, stock: 312 },
  { id: "cmpvrwuot0000ssliml3ldvqg", vendorId: "cmpc2gjz90000ikli1cg4gmsj", name: "Sda", description: "", price: 12, stock: 1119 },
  { id: "cmqtv5fmc000004lbkvkn10eg", vendorId: "cmpc2gjz90000ikli1cg4gmsj", name: "productaDRODSAJNK", description: "", price: 12312, stock: 234123 },
  { id: "cmqtv589v000105jvrhp9h9xk", vendorId: "cmpc2gjz90000ikli1cg4gmsj", name: "producto test123", description: "", price: 123, stock: 13221 },

  // Test Vendedor 1
  { id: "cmpvxs2i3000004l757yjdyph", vendorId: "cmpvxr5er000004l51nrtqen5", name: "Producto Prueba 1", description: "", price: 110, stock: 873 },
  { id: "cmpvxtbiw000104l5iigaovcc", vendorId: "cmpvxr5er000004l51nrtqen5", name: "producto prueba 2", description: "", price: 500, stock: 488 },

  // aguaskaYA
  { id: "cmpvzcxyb000004l7rhtn8rxx", vendorId: "cmpvzaa70000004jx0pr8akam", name: "agua2", description: "", price: 2, stock: 199 },

  // agustin
  { id: "cmpkbxpvq000104iba2h82qbk", vendorId: "cmpkbt5iv000004ibi3g3w7kd", name: "nidon 20", description: "", price: 3000, stock: 12 },

  // Andycode
  { id: "cmpt0prp1000304jmedp3px2w", vendorId: "cmpt0mhyx000104jmkvcy7p64", name: "Canilla de plastic", description: "", price: 9999, stock: 12 },

  // Industrias Alamo biag nig
  { id: "cmpvzgqqe000004l8tzi079ko", vendorId: "cmpvzfw5c000004jscdsssg2x", name: "OG THUNDER AK47", description: "", price: 99, stock: 20 },
  { id: "cmqsq7wmt000004las9abzctr", vendorId: "cmpvzfw5c000004jscdsssg2x", name: "big n dog", description: "", price: 10000000000, stock: 36 },
  { id: "cmqsqb8de000004jjveonxh61", vendorId: "cmpvzfw5c000004jscdsssg2x", name: "og kush", description: "", price: 234, stock: 53 },
  { id: "cmqsqbsid000104lawdl3yfz4", vendorId: "cmpvzfw5c000004jscdsssg2x", name: "purple kush", description: "", price: 455, stock: 32 },

  // dsadas
  { id: "cmpt1o9q5000104jxrwkrcms9", vendorId: "cmpt0o95i000204jmt7zsv5if", name: "Agua de La sierra de", description: "", price: 12.12, stock: 0 },
  { id: "cmpt1r0he000004jpsr71uvtj", vendorId: "cmpt0o95i000204jmt7zsv5if", name: "Agua de la Sierra de Los Padres adsasdas", description: "", price: 1231, stock: 312 },

  // el agua del papu
  { id: "cmpe86zal000105jfbogt40z3", vendorId: "cmpe85dqj000005jfsswj7qgy", name: "agua con lechona", description: "", price: 30, stock: 4 },
]
