<template>
  <div class="functions">
    <ul>
      <li class="myFunc" v-bind:class='{checked:key == item.key}' v-for='item in funcs' v-on:click='clickItem(item.key)'>{{item.description}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'functions',
    data() {
      return {
        key: ''
      };
    },
    props: [
      'funcs'
    ],
    methods: {
      clickItem: function (key) {
        this.key = key;
        this.$emit('clickItem', key);
      }
    },
    created: function() {
      this.key = this.$router.currentRoute.name;
      console.log(this.key);
    }
  };

</script>

<style>
  .functions {
    position: fixed;
    bottom: 22px;
    left: 0;
    width: 100%;
    height: 1.38rem;
    background: #fff;
    border-top: 1px #dfdfdf solid;
    padding-top: 0.2rem;
  }
  
  ul {
    margin: 0;
    padding: 0;
    outline: none;
  }
  
  .myFunc {
    display: inline-block;
    width: 33%;
    background-color: #09bb07;
    color: #fff;
    font-size: 20px;
    text-align: center;
    height: 45px;
    line-height: 45px;
    border-radius: 0.08rem;
  }
  .checked {
    background-color: #5353e0
  }

</style>
