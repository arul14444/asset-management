let Unauthorized = () => {
    return (
    <div class="fix-header card-no-border">
        <section id="wrapper" class="error-page">
            <div class="error-box">
                <div class="error-body text-center">
                    <h1>401</h1>
                    <h3 class="text-uppercase">Anda tidak dikenal</h3>
                    <p class="text-muted m-t-30 m-b-30">Silahkan login terlebih dahulu</p>
                    <a href="/" class="btn btn-info btn-rounded waves-effect waves-light m-b-40">login</a> </div>
                <footer class="footer text-center">2025 © UAXEL.</footer>
            </div>
        </section>
    </div>
    )
}

export default Unauthorized;