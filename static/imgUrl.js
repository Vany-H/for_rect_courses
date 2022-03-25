const formdata = new FormData();

function imgUrl(selectorInput, selectorForImg) {
  const imgInput = document.querySelector(selectorInput);
  const paraentObject = document.querySelector(selectorForImg);

  imgInput.onchange = () => {
    const [file] = imgInput.files;

    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.classList.add('appendImage');

    formdata.append('', file, '[PROXY]');
    paraentObject.appendChild(image);
  };
}

imgUrl('.add-bottom > .file_upload', '.add-image');

document.querySelector('.name').onchange = () => {
  formdata.delete('name');
  formdata.append('name', `${document.querySelector('.name').value}`);
};

document.querySelector('.sale').onchange = () => {
  formdata.delete('sale');
  formdata.append('sale', `${document.querySelector('.sale').value}`);
};

document.querySelector('.grade').onchange = () => {
  formdata.delete('grade');
  formdata.append('grade', `${document.querySelector('.grade').value}`);
};

document.querySelector('.price').onchange = () => {
  formdata.delete('price');
  formdata.append('price', `${document.querySelector('.price').value}`);
};

fetch('http://localhost:3000/brands/list-brand', {
  method: 'GET',
  redirect: 'follow',
})
  .then((response) => response.json())
  .then((res) => {
    const brandField = document.querySelector('.add-brand');
    res.forEach((el) => {
      const div = document.createElement('div');

      div.innerHTML = `${el.name}/${el.id}`;
      div.onclick = () => {
        formdata.delete('brandId');
        formdata.append('brandId', el.id);

        const selects = document.querySelectorAll('.add-brand > .select');
        selects.forEach((el) => el.classList.remove('select'));

        div.classList.add('select');
      };

      brandField.append(div);
    });
  });

fetch('http://localhost:3000/categories/categories-list', {
  method: 'GET',
  redirect: 'follow',
})
  .then((response) => response.json())
  .then((res) => {
    const brandField = document.querySelector('.add-category');
    res.forEach((el) => {
      const div = document.createElement('div');

      div.innerHTML = `${el.name}/${el.id}`;
      div.onclick = () => {
        formdata.delete('categoriesId');
        formdata.append('categoriesId', el.id);

        const selects = document.querySelectorAll('.add-category > .select');
        selects.forEach((el) => el.classList.remove('select'));

        div.classList.add('select');
      };

      brandField.append(div);
    });
  });

const ctayegoryCreate = document.querySelector(
  '.add-category > .listOfSomething > .create-category',
);
const brandCreate = document.querySelector(
  '.add-brand > .listOfSomething > .create-brand',
);

brandCreate.onclick = () => {
  const input = document.querySelector('.add-brand > .listOfSomething > input');

  const raw = { name: `${input.value}` };
  const jsonRaw = JSON.stringify(raw);

  fetch('http://localhost:3000/brands/', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: jsonRaw,
  })
    .then((response) => response.json())
    .then((result) => {
      const window = document.querySelector('.add-brand > .listOfSomething');
      window.classList.add('displayNone');
    });
};

ctayegoryCreate.onclick = () => {
  const input = document.querySelector(
    '.add-category > .listOfSomething > input',
  );

  const raw = { name: input.value };

  fetch('http://localhost:3000/categories/', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(raw),
  })
    .then((response) => response.json())
    .then((result) => {
      const window = document.querySelector('.add-category > .listOfSomething');
      window.classList.add('displayNone');
    });
};

const ctayegoryExist = document.querySelector(
  '.add-category > .listOfSomething > .exit',
);
const brandExist = document.querySelector(
  '.add-brand > .listOfSomething > .exit',
);

ctayegoryExist.onclick = () => {
  const input = document.querySelector('.add-category > .listOfSomething');

  input.classList.add('displayNone');
};
brandExist.onclick = () => {
  const input = document.querySelector('.add-brand > .listOfSomething');

  input.classList.add('displayNone');
};

const ctayegoryAdd = document.querySelector('.add-category > .add-bottom');
const brandAdd = document.querySelector('.add-brand > .add-bottom');
const charAdd = document.querySelector('.add-characteristics > .add-bottom');
ctayegoryAdd.onclick = () => {
  const input = document.querySelector('.add-category > .listOfSomething');

  input.classList.remove('displayNone');
};
brandAdd.onclick = () => {
  const input = document.querySelector('.add-brand > .listOfSomething');

  input.classList.remove('displayNone');
};
charAdd.onclick = () => {
  const input = document.querySelector('.listOfSomething_2');

  input.classList.remove('displayNone');
};

const objCharacteristics = {};

fetch('http://localhost:3000/characteristics/characteristics-list', {
  method: 'GET',
  redirect: 'follow',
})
  .then((response) => response.json())
  .then((res) => {
    const brandField = document.querySelector('.listOfSomething_2');
    res.forEach((el) => {
      const div = document.createElement('div');

      div.innerHTML = `${el.code}/${el.id}/${el.type}`;
      div.onclick = () => {
        brandField.classList.add('displayNone');

        const body = document.querySelector('body');
        const inputValue = document.createElement('div');
        inputValue.innerHTML = `<div>${el.code}</div><input type="text" /><button>OK</button>`;
        inputValue.classList.add('value-form');
        body.append(inputValue);

        const ok = document.querySelector('.value-form > button');
        const input = document.querySelector('.value-form > input');
        const display = document.querySelector('.display');
        ok.onclick = () => {
          objCharacteristics[el.code] = input.value;
          inputValue.remove();

          formdata.delete('characteristics');
          formdata.append(
            'characteristics',
            JSON.stringify(objCharacteristics),
          );

          display.innerHTML = '';

          Object.entries(objCharacteristics).forEach(([key, value]) => {
            const div_2 = document.createElement('div');
            div_2.innerHTML = `${key} == ${value}  /${el.type}`;

            display.append(div_2);
          });
        };
      };

      brandField.append(div);
    });
  });

const send = document.querySelector('.send');

send.onclick = () => {
  var requestOptions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: formdata,
  };

  fetch('http://localhost:3000/items/', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => document.location.reload());
};
