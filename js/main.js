const elList = document.getElementById('list');
const elSelect = document.getElementById('product-manufacturer')
const elForms = document.getElementById('btn')
const elForm = document.getElementById('form')
const elSearch = document.getElementById('search')
const elCount = document.getElementById('count')
const elAdd = document.getElementById('add')
const elTitle = document.getElementById('product-title')
const elPrice = document.getElementById('price')
const elManfacture  = document.getElementById('product-manufacturer')
const elBenefist = document.getElementById('benefits')
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
    const {title,img,price,model,addedDate,benefits,id} = i;
    const elItem = create('li','col-4','');
    elItem.id = 'item';
    elItem.setAttribute('data-id',id)
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
    const elBtnsecondary = elAdd.cloneNode();
    elBtnsecondary.className = 'btn btn-outline-secondary student-edit bg-secondary'
    elBtnsecondary.id = 'btn-edit'
    const elBtndanger = create('button','btn rounded-0 btn-danger','')
    elBtndanger.id = 'btn-danger'
   
    elList.append(elItem);
    elItem.append(elCard);
    elCard.append(elCardimg,elCardbody);
    elCardbody.append(elCardtitle,elCardtxt,elCardtxtdel,elBadge,elBadgetxt,elListcard,elCardbtn);
    elCardtxt.append(elMark);
    elCardtxtdel.append(elDel);
    elCardbtn.append(elBtnsecondary,elBtndanger)
    

}
products.forEach(el =>{
    if (elManfacture.value){
        const elOption = create('option','',el.model);
        elOption.value = el.model
        elManfacture.append(elOption)
    }
})
elList.addEventListener('click', e =>{
    if (e.target.matches('#btn-danger')){
        const current = e.target.closest('#item').dataset.id;
        const currentId = products.findIndex(product => product.id === +current);
        products.splice(currentId,1);
        products.forEach(el =>{
            render(el);
            
        })
        elCount.textContent = `Count: ${products.length}`
    } else if (e.target.matches('#btn-edit')){
        const current = e.target.closest('#item').dataset.id;
        const currentId = products.find(product => product.id === +current);
        const currentIndex = products.findIndex(product => product.id === +current);
        elTitle.value = currentId.title;
        elPrice.value = currentId.price;
        elManfacture.value = currentId.model
        elBenefist.value = currentId.benefits;
        elForms.addEventListener('submit', event =>{
            event.preventDefault();
            console.log(elForms);
            if (elTitle.value.trim() && elPrice.value.trim()){
                
                const product  = {
                    id:currentId.id,
                    img:currentId.img,
                    addedDate:currentId.addedDate,
                    model:elManfacture.value,
                    title:elTitle.value,
                    price:elPrice.value,
                    benefits:elBenefist.value.split(',')
                }
                
                products.splice(currentIndex,1,product);
               
                elList.innerHTML = '';
                products.forEach(el =>{
                    render(el);
                })
            }
        })
    }
})

products.forEach(el =>{
    render(el);
})
    elForm.addEventListener('submit', event =>{
        elList.innerHTML = '';    
        products.forEach(element =>{
            const re = new RegExp(elSearch.value,'gi')
            event.preventDefault();
            if (elSearch.value && element.title.match(re)){
                 render(element);
            }
    }) 
 })

