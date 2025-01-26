import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
actor {


  type Newsletter={
    id:Text;
    by:Principal;
    letter:Text;
    image:Text;
    heading:Text;
  };

  type Owner={
    id:Principal;
    newsletter:[Newsletter];
  };

  //define storages


  let newsletterstorage=HashMap.HashMap<Text,Newsletter>(0,Text.equal,Text.hash);
  let ownersstorages=HashMap.HashMap<Principal,Owner>(1,Principal.equal,Principal.hash);

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };


  //login user
  public shared ({caller}) func login_user():async Text{

    //check if user is registered

    switch(ownersstorages.get(caller)){
      case (null){

        //create a new user

        let new_user:Owner={
          id=caller;
          newsletter=[];
        };

        ownersstorages.put(caller,new_user);
        return "welcome";
      };
      case (?_found){
          return "welcome";
      }
    }
  };

  //get all new letters

    public query func get_newsletters():async [Newsletter]{

    return Iter.toArray(newsletterstorage.vals())
  };

  //get a new letter

  public query func get_newletter(id:Text):async Result.Result<Newsletter,Text>{

    switch(newsletterstorage.get(id)){
      case (null){
        return #err("failed");
      };
      case (?found){
        return #ok(found);
      }
    
  }
  };
  //delete news letter

  public shared ({caller}) func delete_new_letter(id:Text):async Text{

    //verify new letter actually exists

    switch(newsletterstorage.get(id)){
      case (null){
        return "new letter does not exists"
      };
      case (?found){
             switch(ownersstorages.get(caller)){

              case (null){
                return "only owner"
              };
              case (?user){
                //verify its the ownner performin g the action
                 //verify it the owner
              if (Principal.equal(caller, found.by)) {
                   let bufferArray=Buffer.fromArray<Newsletter>(user.newsletter);

                  let newbuffer=Buffer.mapFilter<Newsletter,Newsletter>(bufferArray,func(x){

                  if(x.id==id){
                  null;
                  }else{
                   ?x
                 }
             });
              let newarray=Buffer.toArray(newbuffer);

              let updateduser:Owner={
                id=caller;
                newsletter=newarray;
              };
              ownersstorages.put(caller,updateduser);
                 newsletterstorage.delete(id);
                return "deleted"
              };
              return "failed";
              }
             }
        
      }
    }
  };

  //add nes letter

  public shared ({caller}) func add_nes_letter(letter:Text,image:Text,heading:Text):async Text{

    switch(ownersstorages.get(caller)){
      case (null){
        return "must be registered"
      };
      case (?user){

        //create new nes letter
          let id:Text=Int.toText(Time.now());
        let new_newsletter:Newsletter={
           id=id;
           by=caller;
          letter;
          image;
          heading;
        };
        newsletterstorage.put(id,new_newsletter);


         let owner=Buffer.fromArray<Newsletter>(user.newsletter);
        owner.add(new_newsletter);

        let updateowner=Buffer.toArray(owner);
        let updatedowner:Owner={
          id=caller;
          newsletter=updateowner;
        };
        ownersstorages.put(caller,updatedowner);

       newsletterstorage.put(id,new_newsletter);
       return "created"
      }
    }
  };

  //get my profile
  public shared ({caller}) func get_profile():async Result.Result<Owner,Text>{

    switch( ownersstorages.get(caller)){
      case (null){
        return #err("failed")
      };
      case(?found){
        return #ok(found)
      }
    }
  }
};
//register user
//create new letter
//get new letter
//get all news letter

//delete new letter

