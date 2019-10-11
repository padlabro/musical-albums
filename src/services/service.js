export default class Servise {
  deleteData = async (arr, url) => {
    for (const id of arr) {
      await this.deleteById(id, url);
    }
  };

  deleteById = async (id, url) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE"
    });
  };

  getResourceBase = async url => {
    try {
      let responce = await fetch(`${url}`);
      return responce.json();
    } catch (err) {
    }
  };

  getResource = url => {
    return fetch(
      `http://musicbrainz.org/ws/2/release/?query=release:${url}&fmt=json`
    ).then(res => res.ok ? res : Promise.reject(res))
      .then(res => {
        return res.json();
      }).catch(()=>{return false});
  };
  postResourceArray = async (arr, url) => {
    for (const item of arr) {
      await this.postResourceItem(item, url);
    }
  };
  postResourceById = async (item, url) => {
    try {
      let responce = await fetch(
        `http://musicbrainz.org/ws/2/release/${item}?inc=artist-credits+labels&fmt=json`
      );
      if (responce.status === 200) {
        let yo = await responce.json();
        await this.postResourceItem(yo, url);
      } else {
      }
    } catch (err) {
    }
  };
  postResourceItem = async (item, url) => {
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(item)
    });
  };
}
