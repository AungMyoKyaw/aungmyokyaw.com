<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hi+Melody&display=swap" rel="stylesheet">
</svelte:head>

<div id="content">
  <a href="#" id="white">i</a>
  <a href="https://blog.aungmyokyaw.com" id="white" target="_blank">write</a>
  <a href="https://github.com/AungMyoKyaw" id="white" target="_blank">code</a>
  <a rel="me" href="https://burma.social/@aungmyokyaw" target="_blank" style="display: none;">Mastodon</a>
  <a rel="me" href="https://mastodon.social/@AungMyoKyaw" target="_blank" style="display: none;">Mastodon</a>
</div>

<style>
  #content {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-family: 'Hi Melody', cursive;
    font-size: 4.4em;
    font-weight: bolder;
    margin: 0;
    background-color: transparent;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  #white {
    color: white;
  }

  #yellow {
    color: #fecb00;
  }

  #green {
    color: #34b233;
  }

  #red {
    color: #ea2839;
  }
</style>
