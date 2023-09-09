<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hi+Melody&display=swap" rel="stylesheet">
</svelte:head>

<div id="content">
  <!-- Programmer | Lifelong Learner | Tech Enthusiast | Buddhism Enthusiast -->
  <a href="https://github.com/AungMyoKyaw" id="green" target="_blank">Programmer</a>
  <a href="https://blog.aungmyokyaw.com" id="red" target="_blank">Lifelong Learner</a>
  <a href="https://github.com/AungMyoKyaw" id="white" target="_blank">Tech Enthusiast</a>
  <a href="#" id="yellow" target="_blank">Buddhism Enthusiast</a>
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

  #content a {
    display: block;
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
