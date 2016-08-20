module.exports = {
  login: 
  {
    'ios': {
      popup: '//UIACollectionCell[2]/UIAButton[1]',
      user : '//UIAWindow[1]/UIAScrollView[1]/UIATextField[1]',
      pass : '//UIAWindow[1]/UIAScrollView[1]/UIASecureTextField[1]',
    },
    'android': {
      popup: '',
      user : '//android.view.View[2]/android.widget.EditText[1]',
      pass : '//android.view.View[3]/android.widget.EditText[1]',
    }
  },
  home: 
  {
    'ios': {
      new: '//UIAElement[contains(@name,"NEW")]',
      rows : '//UIAWindow[1]/UIAScrollView[1]/UIAElement',
    },
    'android': {
      new: '//android.view.View[2]/android.view.View[4]',
      rows : '//android.widget.ScrollView[1]/android.view.View[1]/android.view.View',
    }
  },
  vin_enter: 
  {
    'ios': {
      camera_popup_ok: '//UIAWindow[7]/UIAAlert[1]/UIACollectionView[1]/UIACollectionCell[2]/UIAButton[1]',
      align_redline_label : '//UIAWindow[1]/UIAStaticText[1]',
      enter_vin_button: '//UIAApplication[1]/UIAWindow[1]/UIAButton[1]',
      enter_vin_text : '//UIAWindow[1]/UIAScrollView[1]/UIATextField[1]',
      decode_vin_button : '//UIAWindow[1]/UIAElement[3]',                    
    },
    'android': {
      camera_popup_ok: '',
      align_redline_label : 'com.dmx:id/textView',
      enter_vin_button: 'com.dmx:id/manual_vin_entry_button',
      enter_vin_text : '//android.widget.ScrollView[1]/android.view.View[1]/android.widget.EditText[1]',
      decode_vin_button : '//android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[2]/android.view.View[2]',  
    }
  },
  vin_confirm: 
  {
    'ios': {
      decoded_message: '//UIAWindow[1]/UIAStaticText[2]',
      //UIAElement[contains(@name,'CONFIRM')]
      confirm : '//UIAWindow[1]/UIAElement[3]',
    },
    'android': {
      decoded_message: '//android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[2]/android.widget.TextView[1]',
      confirm : '//android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[1]/android.view.View[2]/android.view.View[2]',
    }
  },

  appraisal: 
  {
    'ios': {
      mileage: '//UIAWindow[1]/UIAScrollView[1]/UIATextField[1]',
      ratings_button : '//UIAElement[contains(@name,"Ratings")]',
      paint: '//UIAWindow[1]/UIAElement[3]',
      tires : '//UIAWindow[1]/UIAElement[6]',
      interior : '//UIAWindow[1]/UIAElement[9]',      
      body: '//UIAWindow[1]/UIAElement[10]',
      ratings_confirm : '//UIAApplication[1]/UIAWindow[1]/UIAElement[11]',
      request_bids: '//UIAElement[contains(@name,"REQUEST BIDS")]',
      vin : '//UIAWindow[1]/UIAScrollView[1]/UIAStaticText[5]',
    },
    'android': {
      mileage: '//android.widget.ScrollView[1]/android.view.View[1]/android.widget.EditText[1]',
      ratings_button : '//android.widget.TextView[contains(@text,"Ratings")]',
      paint: '//android.view.View[2]/android.view.View[1]/android.view.View[1]/android.widget.TextView[contains(@text,"Below Avg")]',
      tires : '//android.view.View[3]/android.view.View[2]/android.view.View[1]/android.widget.TextView[contains(@text,"Good")]',
      interior : '//android.view.View[4]/android.view.View[3]/android.widget.TextView[1][contains(@text,"Mint")]',      
      body: '//android.view.View[5]/android.view.View[2]/android.view.View[1]/android.widget.TextView[contains(@text,"Good")]',
      ratings_confirm : '//android.widget.TextView[contains(@text,"CONFIRM")]',
      request_bids: '//android.widget.TextView[contains(@text,"REQUEST BIDS")]',
      vin : '//android.widget.ScrollView[1]/android.view.View[1]/android.view.View[2]/android.widget.TextView[2]',
      interior_color : '//android.view.View[1]/android.view.View[4]',
    }
  },
  success: 
  {
    'ios': {
      success_request_bids: '//UIAApplication[1]/UIAWindow[1]/UIAStaticText[2]',
      home_button : '//UIAApplication[1]/UIAWindow[1]/UIAElement[3]',
    },
    'android': {
      success_request_bids : '//android.widget.TextView[contains(@text,"You")]',  
      home_button: '//android.widget.TextView[contains(@text,"HOME")]',
    }
  },
};
