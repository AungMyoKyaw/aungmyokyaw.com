<script>
  let backgroundImageMediaLoaded = false
  function backgroundImgUrlGen(lowres = false) {
    let times = 3.5;
    if(lowres){
      times = 1;
    }
    const backgroundImgWidth = Math.floor(window.innerWidth * times);
    const backgroundImgHeight = Math.floor(window.innerHeight * times);
    const randomNum = Math.floor(Math.random() * 1e8);
    const backgroundImgUrl = `https://picsum.photos/${backgroundImgWidth}/${backgroundImgHeight}.jpg?random=${randomNum}`;
    return backgroundImgUrl;
  }

  let backgroundImgUrl = backgroundImgUrlGen();
  let tmpBackgroundImgUrl = backgroundImgUrl;
  let overlayOpacity = 1;

  function imageOnLoadHandler(event){
    if(event.srcElement.complete){
      backgroundImageMediaLoaded = true;
      overlayOpacity = 0.05;
      backgroundImgUrl = tmpBackgroundImgUrl;
      setTimeout(() => {
        tmpBackgroundImgUrl = backgroundImgUrlGen();
      }, 3600);
    } else {
      tmpBackgroundImgUrl = backgroundImgUrlGen();
    }
  }

  function imageOnLoadErrorHandler(event){
    tmpBackgroundImgUrl = backgroundImgUrlGen(true);
  }

</script>

{#if backgroundImageMediaLoaded}
  <div style="background-image: url({backgroundImgUrl})"></div>
{/if}
<div class="overlay" style="opacity: {overlayOpacity}"></div>
<img src={tmpBackgroundImgUrl} alt="" style="display: none" on:load={imageOnLoadHandler} on:error={imageOnLoadErrorHandler}/>

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 1.3s ease-in-out;
    background-position: 50% 50%;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
  }
</style>
