const getTag = (req,res) => {
    var tag = req.body.tag;
    console.log(req.body);
    console.log(tag);
    if(!tag)
        res.redirect('/?tagError=true');
    else{
        res.redirect(`/blogs/${tag}`);
    }
}
module.exports = {
    getTag
}