<template>
<div>
    <div class="message">
    <img class="background" :src="background" alt="backgroundImage">
        {{ msg }}
    </div>
    <div class="col-md-6 col-md-offset-3">
      <profilelink></profilelink>
    </div>
    <aboutus></aboutus>
    <techstack></techstack>
</div>
</template>
