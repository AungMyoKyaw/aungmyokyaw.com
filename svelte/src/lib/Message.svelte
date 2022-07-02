<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Permanent Marker"
  />
</svelte:head>

<div id="content">
  <a href="https://blog.aungmyokyaw.com" id="yellow">I</a>
  <a href="https://blog.aungmyokyaw.com" id="green" target="_blank">KNOW</a>
  <a href="https://github.com/AungMyoKyaw" id="red" target="_blank"
    >NOTHING</a
  >
</div>

<style>
  #content {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-family: "Permanent Marker";
    font-size: 4.4em;
    margin: 0;
  }

  a {
    text-decoration: none;
    font-weight: bolder;
  }

  a:hover {
    background-color: white;
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
