const elList = document.getElementById('list');
const elSelect = document.getElementById('product-manufacturer')
const elBtnadd = document.getElementById('btn')
const elForm = document.getElementById('form')
const elSearch = document.getElementById('search')
const elCount = document.getElementById('count')
elCount.textContent = `Count: ${products.length}`
function create (tagName,cllasName = '',content = ''){
    const element = document.createElement(tagName);
    if (cllasName){
        element.className = (cllasName);
    }
    if(content && typeof content ==='string'){
        element.textContent = content;
        return element;
    } else if(content){
        element.append(content)
        return element
    }
    return element;
}
function getData (data){
    const newDAta = new Date(data);
    return `${newDAta.getFullYear()}/${newDAta.getMonth() + 1}/${newDAta.getDate()}`
}
function render (i){
    const {title,img,price,model,addedDate,benefits} = i;
    const elItem = create('li','col-4','');
    const elCard = create('div','card','');
    const elCardimg = create('img','card-img-top','')
    elCardimg.src = img;
    const elCardbody = create('div','card-body','');
    const elCardtitle = create('h3','card-title',title);
    const elCardtxt = create('p','card-text fw-bold','');
    const elMark = create('mark','',price);
    const elCardtxtdel = create('p','card-text','');
    const elDel = create('s','',price);
    const elBadge = create('p','badge bg-success',model);
    const elBadgetxt = create('p','card-text',getData(addedDate));
    const elListcard = create('ul','d-flex flex-wrap list-unstyled','');
    for (j =0; j <= i.benefits.length -1; j++){
        const elItemcard = create('li','badge bg-primary me-1 mb-1',benefits[j])
        elListcard.append(elItemcard)
    }
    const elCardbtn = create('div','position-absolute top-0 end-0 d-flex','')
    const elBtnsecondary = create('button','btn rounded-0 btn-secondary','')
    const elBtndanger = create('button','btn rounded-0 btn-danger','')

    elList.append(elItem);
    elItem.append(elCard);
    elCard.append(elCardimg,elCardbody);
    elCardbody.append(elCardtitle,elCardtxt,elCardtxtdel,elBadge,elBadgetxt,elListcard,elCardbtn);
    elCardtxt.append(elMark);
    elCardtxtdel.append(elDel);
    elCardbtn.append(elBtnsecondary,elBtndanger)

}

const elData  = products;
 elData.forEach(el =>{
    render(el);
    elBtnadd.addEventListener('submit', e =>{
        elList.innerHTML ='';
        e.preventDefault();
            if(elSelect.value && el.model.includes(elSelect.value)){
               render(el);
            }
    })
    elForm.addEventListener('submit', event =>{
        const re = new RegExp(elSearch.value,'gi')
        elList.innerHTML = ''
        event.preventDefault();
        if (elSearch.value && el.title.match(re)){
             render(el);
        }
    }) 
})

const elProduct = manufacturers;
elProduct.forEach(element => {
    const elOption = create('option','',element.name);
    elOption.value = element.name
    elSelect.append(elOption);
})

