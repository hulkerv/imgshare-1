$('#post-comment').hide();

$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle();
});

$('#btn-delete').click(function(e){
    e.preventDefault();
    let $this =$(this);
    let imgId = $this.data('id');
    $('#confirm-remove').html(`
        <div class="alert alert-danger alert-dismissible fade show d-flex" role="alert">
            Are you shure you want to delete this image?
            <form action="/images/${imgId}?_method=DELETE" method="post" class="ml-auto">
                <input type="hidden" name="_method" value="DELETE">
                <button class="btn btn-success btn-sm ml-auto">
                     <span>YES</span>
                </button>
            </form>
            <button class="btn btn-danger btn-sm ml-1" data-dismiss='alert' aria-label='close'>
                <span aria-hidden="true">NOT</span>
            </button>
        </div>
    `)
});