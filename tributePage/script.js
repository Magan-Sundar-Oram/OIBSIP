const vid=document.querySelector('video')
const playBtn=document.querySelector('#header-play-button')

playBtn.addEventListener('click',function(event){
    // event.stopPropagation();
    console.log('button clicked')
    vid.play();
    document.querySelector('#header-above').classList.add('hidden');
})
vid.addEventListener('click',function(){
    vid.pause();
    document.querySelector('#header-above').classList.remove('hidden');
})