function fetchLime(someLat, someLng) {
    const { token } = this.props;

    this.setState({ loading: true });
    const response = await request
        .get(`https://desolate-bayou-65072.herokuapp.com/api/lime?lat=${someLat}&lon=${someLng}`)
        .set('Authorization', token)
    await this.setState({ lime: response.body, loading: false })
}

fetchNike = async () => {
    const { token } = this.props;

    await this.setState({ loading: true });
    const response = await request
        .get(`https://desolate-bayou-65072.herokuapp.com/api/nike?lat=${this.state.lat}&lon=${this.state.lng}`)
        .set('Authorization', token)
    await this.setState({ nike: response.body, loading: false })
}