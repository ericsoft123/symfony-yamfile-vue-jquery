const link = "http://localhost:8080";//change this one with your backend url link running yaml processing file
const vm = new Vue({
  el: '#app',
  data: {
  title: '',
  actionvalue:'',
  keyvalue:'',
  namevalue:'',
  descriptionvalue:'',
  //seen: false,
  classname:'',
   message:"data",
    results: []
  },
  mounted() {
   this.display_data();
  },
  methods:{
      display_data(){
          axios.get(`${link}/displayin_table`).then(response => {
      this.results = response.data
    })
      },
     
      add_new(){
          this.$refs['my-modal'].show()
          this.title="Ajoute une Organisation";
          //this.seen=true;
          this.classname="d-block";//show
          this.actionvalue='add_new';
          document.getElementById('formdata').reset();
      },
      edit(keydata,name,description){
          this.$refs['my-modal'].show()
          this.title="Modifier une Organisation";
          //this.seen=true;//show
          this.classname="d-block";//show
          
          this.actionvalue='edit_file';
          this.keyvalue=keydata;
          this.namevalue=name;
          this.descriptionvalue=description;
       


      },
      del(keydata,name,description){
          this.$refs['my-modal'].show()
          this.title=`voulez-vous supprimer ${name}?`;
          //this.seen=false;
          this.classname="d-none";//show
          this.actionvalue='del_file';
          this.keyvalue=keydata;
          this.namevalue=name;
          this.descriptionvalue=description;
          

      },
     
      onSubmit(){

        let formData = new FormData(document.querySelector('#formdata'));

axios.post(`${link}/submitdata`, formData).then(response => {
      //this.results = response.data
      this.display_data();
      this.$refs['my-modal'].hide()
      
    })
      },
      showModal() {
  this.$refs['my-modal'].show()
}

  }

});

