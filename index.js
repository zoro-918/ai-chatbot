let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let container = document.querySelector(".container");
let api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDSN7GejVjOxxpkGWKNRtK0oTwAT4x-z7c'
let userMassage = null;

function createChatBox(html,className){
    let div = document.createElement("div")
    div.classList.add(className);
    div.innerHTML = html;
    return div
}
async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text")
    try{
        let response =await fetch(api_url,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
               contents:[
                {"role":"user",
                    "parts":[{text:userMassage}]
                }
               ]
            })
        })
    let data = await response.json();
    let apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerHTML = apiResponse

    
    }catch(error){
        console.error(error);
        
    }
    finally{
        aiChatBox.querySelector(".loading").style.display = "none"
    }
}
function showLoading(){
    let html = ` <div class="img">
                <img src="ai.png" alt="ai" width="50px">
            </div>
            <p class="text"></p>
            <img class="loading" src="loading.gif" alt="loading" height="50">`
    let aiChatBox = createChatBox(html,"bot-container");
    chatContainer.appendChild(aiChatBox);
    getApiResponse(aiChatBox);
}

btn.addEventListener("click",()=>{
        userMassage = prompt.value;
        if(userMassage.value==""){
            container.style.display = "flex"
        }else{
            container.style.display = "none"
        }
        if(!userMassage) return;
        let html = ` <div class="user-container">
            
            <p class="text"></p>
        </div>`
        let userChatBox = createChatBox(html,"user-container");
        userChatBox.querySelector(".text").innerHTML = userMassage;
        chatContainer.appendChild(userChatBox)
        prompt.value = '';

        setTimeout(showLoading,400);
})
