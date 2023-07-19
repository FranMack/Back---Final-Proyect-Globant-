const mongoose = require("mongoose");
const modelOptions = require("./model.options");
const reportSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    homeoffice:{
        type:Boolean,
        require:true,
        default:false,
    },
    floor_number:{
        type:Number,
        require:false
    },

    box_number:{
        type:Number,
        require:false
    },
    

    device:{
        type:String,
        require:true,
    },
    url_img:{
        type:String,
        require:false,
    },
    location:{
        type:String,
        require:true,
    },
    latitud:{
        type:Number,
        require:true
    },
    longitude:{
        type:Number,
        require:true
    },

    description:{
        type:String,
        require:true,
    },
    status_report:{
        type:String,
        require:true,
    },
    date_report:{
        type:Date,
        require:true,
    }

    
  },
  {modelOptions}
);



const reportModel = mongoose.model("Report", reportSchema);

module.exports = reportModel;