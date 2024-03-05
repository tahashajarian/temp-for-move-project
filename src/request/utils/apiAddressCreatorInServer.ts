// import {promises as fs} from "fs";

async function apiAddressCreatorInServer(url:string) {
  // const file = await fs.readFile(process.cwd() + '/public/data.json', 'utf8')
  // const data = JSON.parse(file);

  return process.env.REACT_APP_SERVER_ADDRESS + url
}

export default apiAddressCreatorInServer