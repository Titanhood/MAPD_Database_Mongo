module.exports = function(options) {
    this.add({role: 'product', cmd: 'add'}, function(msg, respond){
        this.make('product').data$(msg.data).save$(respond);
    });
    
    this.find({role: 'product', cmd: 'get'}, function(msg, respond) {
        this.make('product').load$(msg.id, respond);
    });
}
