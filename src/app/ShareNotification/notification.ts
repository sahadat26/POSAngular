export class CustomNotification {

    public SuccessfullMsg(msg:string)
    {
        return msg+' has been successfully created';
    }
    public ExistMsg(msg:string)
    {
        return msg+' Already Exist!';
    }

    public UpdatedMsg(msg:string)
    {
        return msg+' has been successfully updated';
    }
    public DeleteMsg(msg:string)
    {
        return msg+' successfully Deleted';
    }
}
