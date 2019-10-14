export default class Servise {
  deleteData = async (arr, url) => {
    for (const id of arr) {
      await this.deleteById(id, url);
    }
  };

  deleteById = async (id,url) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE"
	});
	return 'ready'
  };

  getResourceBase = async url => {
    try {
      let responce = await fetch(`${url}`);
      return responce.json();
    } catch (err) {}
  };

  getResource = url => {
    return fetch(
      `https://musicbrainz.org/ws/2/release/?query=release:${url}&fmt=json`
    )
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => {
        return res.json();
      })
      .catch(() => {
        return false;
      });
  };
  postResourceArray = async (arr, url, numbers) => {
    let array = [];
    for (let i = 0; i < arr.length; i++) {
	  let res = await this.postResourceItem(arr[i], url);
	  console.log(res);
      if (res !== false) {
        array.push(numbers[i]);
	  }
	  else return false
    }
    return array;
  };
  postResourceById = async (item, url) => {
      let responce = await fetch(
        `https://musicbrainz.org/ws/2/release/${item}?inc=artist-credits+labels&fmt=json`
      );
      if (responce.status === 200) {
        let res = await responce.json();
        await this.postResourceItem(res, url);
      }
  };
  postResourceItem = async (item, url) => {
	  try{
		let responce = await fetch(`${url}`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json;charset=utf-8"
			},
			body: JSON.stringify(item)
		  });
		  console.log(responce);
		  if (responce.status === 500) {
			return responce.status;
		  }
	  }catch{
		  return false
	  }
  };
}
